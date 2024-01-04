import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

export function ModalDetails({ handleClickDesactive, productId }) {
  const [openModal, setOpenModal] = useState(false);
  const [reason, setReason] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setReason('');
  }

  return (
    <>
    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
     onClick={() => setOpenModal(true)}>
        Deactivate
    </a>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">To deactivate a product you need a reason</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="reason" value="Reason" />
              </div>
              <TextInput
                id="reason"
                placeholder="Enter the reason to deactive"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-end text-sm font-medium text-gray-500 dark:text-gray-300"> 
              <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500" onClick={() => handleClickDesactive(productId, reason)} >
                Send reason
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
