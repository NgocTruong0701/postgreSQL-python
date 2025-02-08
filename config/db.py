import psycopg2
from config.settings import Settings
settings = Settings()

class Database:
    def __init__(self):
        connection_params = settings.connection_params
        self.connection = psycopg2.connect(**connection_params)
        self.connection.autocommit = True 

    def __new__(cls):
        if not hasattr(cls, "_instance"):
            cls._instance = super().__new__(cls)
        return cls._instance

    def query(self, query, params=None):
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, params)
                return cursor.fetchall()
        except Exception as e:
            self.connection.rollback() 
            print(f"Database error: {str(e)}")
            raise
        
    def execute(self, query, params=None):
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, params)
                try:
                    result = cursor.fetchall()
                except:
                    result = None
                self.connection.commit()
                return result
        except Exception as e:
            self.connection.rollback()  # Rollback nếu có lỗi
            print(f"Database error: {str(e)}")
            raise

    def reset_connection(self):
        """Reset connection if needed"""
        try:
            self.connection.close()
            connection_params = settings.connection_params
            self.connection = psycopg2.connect(**connection_params)
            self.connection.autocommit = True
        except Exception as e:
            print(f"Reset connection error: {str(e)}")
            raise
