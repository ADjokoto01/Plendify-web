import { Modal, Text, DoubleButton } from "@/components";
import { useNavigate } from "react-router-dom";

export const SuccessModal = ({
  isOpen,
  setIsOpen,
  successImage,
  title,
  description,
  buttonText,
  route,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  successImage: string;
  title: string;
  description: string;
  buttonText: string;
  route: string;
}) => {
  const navigate = useNavigate();
  return (
    <Modal
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
      className="max-w-[875px] w-full p-1 grid md:grid-cols-2"
      noTitle
    >
      <section className="flex flex-col gap-6 items-center justify-center max-w-[350px] w-full mx-auto">
        <div className="flex flex-col gap-4">
          <Text variant="h2" weight="medium">
            {title}
          </Text>
          <Text variant="p" weight="medium">
            {description}
          </Text>
        </div>
        <DoubleButton onClick={() => navigate(route)}>
          {buttonText}
        </DoubleButton>
      </section>

      <div className="hidden md:block max-w-[500px] w-full">
        <img src={successImage} alt="success" className="w-full h-full" />
      </div>
    </Modal>
  );
};
