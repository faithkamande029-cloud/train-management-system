import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../services/userService";

export const USERS_QUERY_KEY = ["users"];

export function useUsers() {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: getUsers,
    select: (res) => res.data,
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: [...USERS_QUERY_KEY, id],
    queryFn: () => getUserById(id),
    select: (res) => res.data,
    enabled: !!id,
  });
}

export function useAddUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  });
}