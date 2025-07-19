"""This module extracts information from your `.env` file so that
you can use your AlphaVantage API key in other parts of the application.
"""

import os

# pydantic v2 used for data validation: https://docs.pydantic.dev/
from pydantic import BaseSettings
from pydantic_settings import SettingsConfigDict


def return_full_path(filename: str = ".env") -> str:
    """Uses os to return the correct path of the `.env` file."""
    absolute_path = os.path.abspath(__file__)
    directory_name = os.path.dirname(absolute_path)
    full_path = os.path.join(directory_name, filename)
    return full_path


class Settings(BaseSettings):
    """Uses pydantic to define settings for project."""

    alpha_api_key: str
    db_name: str
    model_directory: str

    model_config = SettingsConfigDict(env_file=return_full_path(".env"))


# Create instance of `Settings` class that will be imported
# in lesson notebooks and the other modules for application.
settings = Settings()
