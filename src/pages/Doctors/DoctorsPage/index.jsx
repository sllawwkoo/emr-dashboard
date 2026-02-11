import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import HeaderPage from "@/components/HeaderPage";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import frontRoutes from "@/routes/frontRoutes";
import { useGetDoctorsQuery, useDeleteDoctorsMutation } from "@/api";
import { pageHeaders } from "@/utils/pageHeaders.config";
import DoctorsList from "../components/DoctorsList";
import styles from "./DoctorsPage.module.scss";

function DoctorsPage() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetDoctorsQuery();

  const [deleteDoctor] = useDeleteDoctorsMutation();

  const doctors = useMemo(() => {
    if (!data?.ids || !data?.entities) return [];
    return data.ids.map((id) => data.entities[id]);
  }, [data]);

  const handleDeleteConfirm = async () => {
    if (!doctorToDelete?.id) return;

    await deleteDoctor(doctorToDelete.id);

    setIsModalOpen(false);
    setDoctorToDelete(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setDoctorToDelete(null);
  };

  return (
    <div className={styles.page}>
      <HeaderPage
        title={pageHeaders.doctors.title}
        description={pageHeaders.doctors.description}
        helperText={pageHeaders.doctors.helperText}
      />

      <div className={styles.content}>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={styles.addButton}
            onClick={() => navigate(frontRoutes.navigate.doctors.create)}
          >
            Додати лікаря
          </button>
        </div>

        {isLoading && <Loader />}

        {isError && (
          <div className={styles.error}>
            Помилка завантаження даних: {error?.message || "Невідома помилка"}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {doctors.length === 0 ? (
              <p className={styles.empty}>Лікарів не знайдено</p>
            ) : (
              <DoctorsList
                doctors={doctors}
                onEdit={(id) =>
                  navigate(frontRoutes.navigate.doctors.edit(id))
                }
                onDelete={(doctor) => {
                  setDoctorToDelete(doctor);
                  setIsModalOpen(true);
                }}
              />
            )}
          </>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        title="Видалити лікаря?"
      >
        {doctorToDelete && (
          <span>
            Ви впевнені, що хочете видалити лікаря{" "}
            <strong>{doctorToDelete.fullName}</strong>?
          </span>
        )}
      </Modal>
    </div>
  );
}

export default DoctorsPage;