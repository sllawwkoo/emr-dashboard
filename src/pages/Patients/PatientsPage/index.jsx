import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import SearchInput from "@/components/SearchInput";
import HeaderPage from "@/components/HeaderPage";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import PatientsList from "../components/PatientsList";
import frontRoutes from "@/routes/frontRoutes";
import {
  useGetPatientsQuery,
  useGetFilteredByPatientNameQuery,
  useDeletePatientsMutation,
} from "@/api";
import { pageHeaders } from "@/utils/pageHeaders.config";
import styles from "./PatientsPage.module.scss";

function PatientsPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  const limit = 5;
  const isSearchMode = debouncedSearch.trim() !== "";

  // 🔹 PRIMARY QUERY — БЕЗ skip
  const {
    data,
    isLoading: isLoadingPatients,
    isError: isErrorPatients,
    error: errorPatients,
  } = useGetPatientsQuery({ page, limit });

  // 🔹 SECONDARY QUERY — з skip
  const {
    data: filteredData = [],
    isLoading: isLoadingFiltered,
    isError: isErrorFiltered,
    error: errorFiltered,
  } = useGetFilteredByPatientNameQuery(debouncedSearch, {
    skip: !isSearchMode,
  });

  const [deletePatient] = useDeletePatientsMutation();


  // 🔹 Дані для списку
  const patients = useMemo(() => {
    return data?.ids.map(id => data.entities[id]) || []
  }, [data]);

  const metaTotalPages = Number(data?.meta?.totalPages) || 1;
  const totalPages =
    !isSearchMode && patients.length === 0 && page > 1
      ? page - 1
      : metaTotalPages;

  const patientsList = isSearchMode ? filteredData?.data || [] : patients;
  const isLoading = isSearchMode ? isLoadingFiltered : isLoadingPatients;
  const isError = isSearchMode ? isErrorFiltered : isErrorPatients;
  const error = isSearchMode ? errorFiltered : errorPatients;

  const handleSearch = useCallback((value) => {
    setDebouncedSearch((typeof value === "string" ? value : "").trim());
    setPage(1);
  }, []);

  const handleDeleteConfirm = async () => {
    if (!patientToDelete?.id) return;
    const wasLastOnPage =
      !isSearchMode && page > 1 && patientsList.length === 1;
    await deletePatient(patientToDelete.id);
    if (wasLastOnPage) setPage((p) => p - 1);
    setIsModalOpen(false);
    setPatientToDelete(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPatientToDelete(null);
  };

  useEffect(() => {
    if (
      !isSearchMode &&
      !isLoading &&
      !searchQuery &&
      patients.length === 0 &&
      page > 1
    ) {
      setPage((prev) => prev - 1);
    }
  }, [isSearchMode, isLoading, searchQuery, patients.length, page]);

  return (
    <div className={styles.page}>
      <HeaderPage
        title={pageHeaders.patients.title}
        description={pageHeaders.patients.description}
        helperText={pageHeaders.patients.helperText}
      />

      <div className={styles.content}>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={styles.addButton}
            onClick={() => navigate(frontRoutes.navigate.patients.create)}
          >
            Додати пацієнта
          </button>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            delay={500}
            placeholder="Пошук пацієнта..."
          />
        </div>

        {isLoading && <Loader />}

        {isError && (
          <div className={styles.error}>
            Помилка завантаження даних: {error?.message || "Невідома помилка"}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <PatientsList
              patients={patientsList}
              onView={(id) =>
                navigate(frontRoutes.navigate.patients.details(id))
              }
              onEdit={(id) =>
                navigate(frontRoutes.navigate.patients.edit(id))
              }
              onDelete={(patient) => {
                setPatientToDelete(patient);
                setIsModalOpen(true);
              }}
            />

            {!isSearchMode && totalPages > 1 && (
              <div className={styles.paginationWrap}>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        title="Видалити пацієнта?"
      >
        {patientToDelete && (
          <span>
            Ви впевнені, що хочете видалити пацієнта{" "}
            <strong>{patientToDelete.fullName}</strong>?
          </span>
        )}
      </Modal>
    </div>
  );
}

export default PatientsPage;
