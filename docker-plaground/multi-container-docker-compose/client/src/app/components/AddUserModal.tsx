/* eslint-disable @typescript-eslint/no-explicit-any */
import ActionSubmitButton from "./ActionSubmitButton";
import Modal from "./Modal";

const AddUserModal = ({ isOpen, onClose, formAction }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add User">
      <form action={formAction} id="addUserForm">
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email" // Important for FormData
            className="border rounded w-full py-2 px-3 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="email">
            Password
          </label>
          <div className="mb-4">
          <input
            type="password"
            id="password"
            name="password" // Important for FormData
            className="border rounded w-full py-2 px-3 text-black"
            required
          />
          </div>
          <input name="image" type="file" className="border rounded w-full py-2 px-3 text-black "></input>
        </div>

        <ActionSubmitButton>add</ActionSubmitButton>
      </form>
    </Modal>
  );
};
export default AddUserModal;
