import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import SearchInput from "@/components/SearchInput";
import HeaderPage from "@/components/HeaderPage";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import AppointmentsList from "../components/AppointmentsList";
import frontRoutes from "@/routes/frontRoutes";
import {
  useGetAllAppointmentsQuery,
  useGetFilteredAppointmentsByPatientNameQuery,
  useGetFilteredAppointmentsByDateQuery,
  useDeleteAppointmentMutation,
  useUpdateAppointmentMutation,
} from "@/api";
import { pageHeaders } from "@/utils/pageHeaders.config";
import styles from "./AppointmentsPage.module.scss";

function AppointmentsPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const limit = 5;
  const hasSearch = debouncedSearch.trim() !== "";
  const hasDateFilter = filterDate.trim() !== "";
  const hasActiveFilter = hasSearch || hasDateFilter;

  const {
    data: paginatedData,
    isLoading: isLoadingPaginated,
    isError: isErrorPaginated,
    error: errorPaginated,
  } = useGetAllAppointmentsQuery(
    { page, limit },
    { skip: hasActiveFilter }
  );

  const {
    data: filteredByNameData,
    isLoading: isLoadingByName,
    isError: isErrorByName,
    error: errorByName,
  } = useGetFilteredAppointmentsByPatientNameQuery(debouncedSearch, {
    skip: !hasSearch,
  });

  const {
    data: filteredByDateData,
    isLoading: isLoadingByDate,
    isError: isErrorByDate,
    error: errorByDate,
  } = useGetFilteredAppointmentsByDateQuery(filterDate, {
    skip: !hasDateFilter || hasSearch,
  });

  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [updateAppointment] = useUpdateAppointmentMutation();

  const handleStatusChange = useCallback((id, newStatus) => {
    updateAppointment({ id, status: newStatus });
  }, [updateAppointment]);

  const appointmentsList = useMemo(() => {
    if (hasSearch) {
      const raw = filteredByNameData;
      return Array.isArray(raw) ? raw : raw?.data ?? [];
    }
    if (hasDateFilter) {
      const raw = filteredByDateData;
      return Array.isArray(raw) ? raw : raw?.data ?? [];
    }
    return paginatedData?.items ?? [];
  }, [
    hasSearch,
    hasDateFilter,
    filteredByNameData,
    filteredByDateData,
    paginatedData,
  ]);

  const isLoading = hasSearch
    ? isLoadingByName
    : hasDateFilter
      ? isLoadingByDate
      : isLoadingPaginated;
  const isError = hasSearch
    ? isErrorByName
    : hasDateFilter
      ? isErrorByDate
      : isErrorPaginated;
  const error = hasSearch ? errorByName : hasDateFilter ? errorByDate : errorPaginated;

  const metaTotalPages = Number(paginatedData?.meta?.totalPages) || 1;
  const totalPages =
    !hasActiveFilter && appointmentsList.length === 0 && page > 1
      ? Math.max(1, page - 1)
      : metaTotalPages;

  const handleSearch = useCallback((value) => {
    setDebouncedSearch((typeof value === "string" ? value : "").trim());
    setPage(1);
  }, []);

  const handleFilterDateChange = useCallback((e) => {
    setFilterDate(e.target.value ?? "");
    setPage(1);
  }, []);

  const handleDeleteConfirm = async () => {
    if (!appointmentToDelete?.id) return;
    const wasLastOnPage =
      !hasActiveFilter && page > 1 && appointmentsList.length === 1;
    await deleteAppointment(appointmentToDelete.id);
    if (wasLastOnPage) setPage((p) => Math.max(1, p - 1));
    setIsModalOpen(false);
    setAppointmentToDelete(null);
  };

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setAppointmentToDelete(null);
  }, []);

  useEffect(() => {
    if (
      !hasActiveFilter &&
      !isLoading &&
      appointmentsList.length === 0 &&
      page > 1
    ) {
      setPage((prev) => prev - 1);
    }
  }, [hasActiveFilter, isLoading, appointmentsList.length, page]);

  return (
    <div className={styles.page}>
      <HeaderPage
        title={pageHeaders.appointments.title}
        description={pageHeaders.appointments.description}
        helperText={pageHeaders.appointments.helperText}
      />

      <div className={styles.content}>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={styles.addButton}
            onClick={() => navigate(frontRoutes.navigate.appointments.create)}
          >
            Додати прийом
          </button>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            delay={500}
            placeholder="Пошук по пацієнту..."
          />
          <label className={styles.dateFilterLabel}>
            <span className={styles.dateFilterText}>Дата</span>
            <input
              type="date"
              className={styles.dateFilterInput}
              value={filterDate}
              onChange={handleFilterDateChange}
              aria-label="Фільтр по даті прийому"
            />
          </label>
        </div>

        {isLoading && <Loader />}

        {isError && (
          <div className={styles.error}>
            Помилка завантаження даних: {error?.message || "Невідома помилка"}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {appointmentsList.length === 0 ? (
              <p className={styles.empty}>Прийомів не знайдено</p>
            ) : (
              <AppointmentsList
                appointments={appointmentsList}
                onEdit={(id) =>
                  navigate(frontRoutes.navigate.appointments.edit(id))
                }
                onDelete={(appointment) => {
                  setAppointmentToDelete(appointment);
                  setIsModalOpen(true);
                }}
                onStatusChange={handleStatusChange}
              />
            )}

            {!hasActiveFilter && totalPages > 1 && (
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
        title="Видалити прийом?"
      >
        {appointmentToDelete && (
          <span>
            Ви впевнені, що хочете видалити цей прийом?
          </span>
        )}
      </Modal>
    </div>
  );
}

export default AppointmentsPage;
