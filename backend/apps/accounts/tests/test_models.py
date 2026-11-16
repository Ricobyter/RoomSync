import uuid

import pytest
from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction

User = get_user_model()

pytestmark = pytest.mark.django_db


def make_user(email="alice@example.com", password="s3cret-pass-123", **kwargs):
    kwargs.setdefault("first_name", "Alice")
    kwargs.setdefault("last_name", "Doe")
    return User.objects.create_user(email=email, password=password, **kwargs)


def test_auth_user_model_is_custom():
    assert User._meta.label == "accounts.User"
    assert User.USERNAME_FIELD == "email"


def test_create_user():
    user = make_user()
    assert user.email == "alice@example.com"
    assert user.is_active is True
    assert user.is_staff is False
    assert user.is_superuser is False
    assert user.email_verified_at is None
    assert user.created_at is not None
    assert user.updated_at is not None


def test_primary_key_is_uuid():
    user = make_user()
    assert isinstance(user.pk, uuid.UUID)
    assert user.pk.version == 4


def test_email_is_normalised():
    user = make_user(email="  Alice.Doe@EXAMPLE.COM ")
    assert user.email == "alice.doe@example.com"


def test_email_is_required():
    with pytest.raises(ValueError):
        User.objects.create_user(email="", password="x")


def test_email_unique_including_case():
    make_user(email="alice@example.com")
    with pytest.raises(IntegrityError), transaction.atomic():
        make_user(email="ALICE@example.com")


def test_password_is_hashed_and_verifiable():
    user = make_user(password="s3cret-pass-123")
    assert user.password != "s3cret-pass-123"
    assert user.check_password("s3cret-pass-123")
    assert not user.check_password("wrong")


def test_user_without_password_is_unusable():
    user = User.objects.create_user(email="nopw@example.com", first_name="N", last_name="P")
    assert not user.has_usable_password()


def test_create_superuser():
    admin = User.objects.create_superuser(
        email="root@example.com", password="s3cret-pass-123", first_name="Root", last_name="User"
    )
    assert admin.is_staff is True
    assert admin.is_superuser is True
    assert admin.is_active is True


def test_create_superuser_rejects_non_staff():
    with pytest.raises(ValueError):
        User.objects.create_superuser(email="x@example.com", password="x", is_staff=False)
    with pytest.raises(ValueError):
        User.objects.create_superuser(email="y@example.com", password="x", is_superuser=False)


def test_str_and_full_name():
    user = make_user()
    assert str(user) == "alice@example.com"
    assert user.get_full_name() == "Alice Doe"
