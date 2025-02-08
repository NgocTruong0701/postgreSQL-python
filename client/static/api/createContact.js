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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function createContact(newContact) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Log data trước khi gửi
            console.log('Sending data:', {
                name: newContact.name,
                phone: newContact.phone,
                email: newContact.email
            });
            const response = yield fetch("http://127.0.0.1:8000/contact", {
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
            // Log full response
            console.log('Response status:', response.status);
            const responseData = yield response.json();
            console.log('Response data:', responseData);
            if (!response.ok) {
                console.log('Response data:', JSON.stringify(responseData));
                throw new Error(`Bad response: ${response.status} - ${JSON.stringify(responseData)}`);
            }
            const id = responseData;
            console.log('Created ID:', id);
            const createdContact = [
                id,
                newContact.name,
                newContact.phone,
                newContact.email,
                false,
            ];
            return createdContact;
        }
        catch (err) {
            console.log('Full error:', err);
            throw new Error("Error fetching data");
        }
    });
}
