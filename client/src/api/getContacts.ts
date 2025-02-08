/**
 * Asynchronous function to fetch contacts from a server.
 *
 * @returns {Promise<contact[]>} A promise that resolves to an array of contacts.
 * @throws {Error} If the HTTP response is not okay or if an error occurs during the fetch operation.
 *
 * @async
 * @function
 * @name getContacts
 *
 * @example
 * try {
 *   const contacts = await getContacts();
 *   console.log(contacts);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */

export async function getContacts(): Promise<contact[]> {
    try {
        const response: Response = await fetch("/contacts", {
            method: "GET",
            headers: {},
        });

        if (response.ok) {
            const result: contact[] = await response.json();
            return result;
        } else {
            throw new Error("Bad response");
        }
    } catch (err) {
        throw new Error("Can't do the fetch");
    }
}
