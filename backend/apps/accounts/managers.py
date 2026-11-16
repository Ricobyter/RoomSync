from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    """Manager for the email-based User model."""

    use_in_migrations = True

    @staticmethod
    def normalize_email(email: str | None) -> str:
        """Strip and lowercase the whole address so lookups and uniqueness are case-insensitive."""
        return (email or "").strip().lower()

    def _create_user(self, email: str, password: str | None, **extra_fields):
        email = self.normalize_email(email)
        if not email:
            raise ValueError("The email address must be set.")
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # None yields an unusable password.
        user.save(using=self._db)
        return user

    def create_user(self, email: str, password: str | None = None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email: str, password: str | None = None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields["is_staff"] is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields["is_superuser"] is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self._create_user(email, password, **extra_fields)
