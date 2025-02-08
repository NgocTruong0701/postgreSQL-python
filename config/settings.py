"""
Module: database_settings

This module defines a Settings class containing parameters for connecting to a database.

Classes:
- Settings: A class representing settings for database connection.

Example:
    settings = Settings()
    db_params = settings.connection_params
"""
import os

class Settings:
    """
    A class representing settings for the system.

    Attributes:
    - connection_params (dict): A dictionary containing parameters for the database connection.
        - dbname (str): The name of the database.
        - user (str): The username for connecting to the database.
        - password (str): The password for connecting to the database.
        - host (str): The host where the database server is running.
        - port (str): The port number to connect to the database.

    Example:
    settings = Settings()
    db_params = settings.connection_params
    """
    connection_params = {
        "dbname":   os.getenv("dbname"),
        "user":     os.getenv("user"),
        "password": os.getenv("password"),
        "host":     os.getenv("host"),
        "port":     os.getenv("port")
    }
