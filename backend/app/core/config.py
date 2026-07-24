from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Project Information
    project_name: str = "TrinetraAI"
    version: str = "1.0.0"
    debug: bool = True

    # PostgreSQL Configuration
    postgres_user: str
    postgres_password: str
    postgres_db: str
    postgres_host: str
    postgres_port: int

    # JWT Authentication
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    # Tell Pydantic where to load environment variables from
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore"
    )

    @property
    def database_url(self) -> str:
        return (
            f"postgresql://{self.postgres_user}:"
            f"{self.postgres_password}@"
            f"{self.postgres_host}:"
            f"{self.postgres_port}/"
            f"{self.postgres_db}"
        )


# Create one shared settings object
settings = Settings()