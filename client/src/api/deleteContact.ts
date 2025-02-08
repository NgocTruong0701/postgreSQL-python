/**
 * Asynchronous function to delete a contact by sending a DELETE request to the server.
 *
 * @param {number} id - The identifier of the contact to be deleted.
 *
 * @returns {Promise<void>} A promise that resolves when the contact is successfully deleted.
 * @throws {Error} If the HTTP response is not okay or if an error occurs during the fetch operation.
 *
 * @async
 * @function
 * @name deleteContact
 *
 * @example
 * try {
 *   const contactIdToDelete = 123;
 *   await deleteContact(contactIdToDelete);
 *   console.log("Contact deleted successfully");
 * } catch (error) {
 *   console.error(error.message);
 * }
 */

export async function deleteContact(id: number): Promise<void> {
  try {
    const response = await fetch("/contact/" + id, {
      method: 'DELETE',
      headers: {},
      body: JSON.stringify(false)
    });
  
    if (!response.ok) {
      throw new Error("Bad response");
    }

  } catch (err) {
    console.error(err);
    throw new Error("Error fetching");
  }
}