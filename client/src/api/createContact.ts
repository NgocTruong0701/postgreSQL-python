/**
 * Asynchronous function to create a new contact by sending a POST request to the server.
 *
 * @param {contactBase} newcontact - The base information for the new contact.
 * @param {string} newcontact.name - The name of the new contact.
 * @param {string} newcontact.phone - The phone number of the new contact.
 * @param {string} newcontact.email - The email address of the new contact.
 *
 * @returns {Promise<contact>} A promise that resolves to the created contact.
 * @throws {Error} If the HTTP response is not okay or if an error occurs during the fetch operation.
 *
 * @async
 * @function
 * @name createcontact
 *
 * @example
 * try {
 *   const newcontact = {
 *     name: "John Doe",
 *     phone: "123-456-7890",
 *     email: "john.doe@example.com",
 *   };
 *   const createdContact = await createcontact(newcontact);
 *   console.log(createdContact);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */

export async function createContact(newContact: contactBase): Promise<contact> {
    try {
        const response = await fetch("http://127.0.0.1:8000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: newContact.name,
                phone: newContact.phone,
                email: newContact.email,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(`Bad response: ${response.status} - ${JSON.stringify(responseData)}`);
        }

        const id: number = responseData;
        const createdContact: contact = [
            id,
            newContact.name,
            newContact.phone,
            newContact.email,
            false,
        ];
        return createdContact;

    } catch (err) {
        throw new Error("Error fetching data");
    }
}