from pydantic import BaseModel, EmailStr

class Contact(BaseModel):
    """
    Pydantic model for representing a contact.

    Attributes:
    - name (str): The name of the contact.
    - phone (str): The phone number of the contact.
    - email (EmailStr): The email address of the contact.

    Example:
    contact_data = {
        "name": "John Doe",
        "phone": "123-456-7890",
        "email": "john.doe@example.com"
    }
    contact = Contact(**contact_data)
    """

    name: str
    phone: str
    email: EmailStr