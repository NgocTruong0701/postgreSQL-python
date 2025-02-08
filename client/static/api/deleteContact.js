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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function deleteContact(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("/contact/" + id, {
                method: 'DELETE',
                headers: {},
                body: JSON.stringify(false)
            });
            if (!response.ok) {
                throw new Error("Bad response");
            }
        }
        catch (err) {
            console.error(err);
            throw new Error("Error fetching");
        }
    });
}
