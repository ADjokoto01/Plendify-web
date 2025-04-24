import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { cn } from '@/lib/utils';
import { Icon } from '@/lib';

type ModalProps = Readonly<{
  children: React.ReactNode;
  title?: string | React.ReactNode;
  isOpen: boolean;
  className?: string;
  noTitle?: boolean;
  closeModal: () => void;
  position?: 'center' | 'side';
}>;

export function Modal({
  title,
  children,
  isOpen,
  noTitle = false,
  className = '',
  closeModal,
  position = 'center',
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeModal || (() => {})}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#021210B8]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={cn({
              'flex min-h-full items-center justify-center p-4 text-center':
                position === 'center',
              'fixed inset-y-0 right-0 flex min-h-full items-center justify-end p-4 text-center':
                position === 'side',
            })}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  'flex flex-col gap-5 w-full transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all',
                  className,
                )}
              >
                {!noTitle && (
                  <div className="w-full flex gap-4 items-center justify-between relative">
                    <Dialog.Title
                      as="h3"
                      className="text-base grow font-bold leading-6 text-black-100"
                    >
                      {title}
                    </Dialog.Title>
                    <button
                      title="button"
                      onClick={closeModal}
                      className="bg-gray-50 rounded-full p-1 focus:outline-none"
                    >
                      <Icon icon="mdi:close-thick" width={20} height={20} />
                    </button>
                  </div>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
