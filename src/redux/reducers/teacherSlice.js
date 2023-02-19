import { apiSlice } from "../apiSlice";

export const teacherSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranchesByYear: builder.query({
      query: (params) => ({
        url: "/get-branchesby-year",
        method: "GET",
        params,
      }),
    }),
    getSectionsByBranchYear: builder.query({
      query: (params) => ({
        url: "/get-sections-by-branch-year",
        method: "GET",
        params,
      }),
    }),

    getSubjectByBranchYearSectionSem: builder.query({
      query: (params) => ({
        url: "/get-subject-by-branch-year-section-sem",
        method: "GET",
        params,
      }),
    }),

    getAssignmentsByTeacher: builder.query({
      query: (params) => ({
        url: "/class-assignments-details",
        method: "GET",
        params,
      }),
    }),

    getClassAssignmentsBasedOnTitle: builder.query({
      query: (params) => ({
        url: "/get-class-assignments-title",
        method: "GET",
        params,
      }),
    }),

    createAssignment: builder.mutation({
      query: (data) => ({
        url: "/create-assignment",
        method: "POST",
        data,
      }),
      invalidatesTags: () => []
    }),
  }),
});

export const {
  useGetBranchesByYearQuery,
  useGetSectionsByBranchYearQuery,
  useGetAssignmentsByTeacherQuery,
  useGetSubjectByBranchYearSectionSemQuery,
  useGetClassAssignmentsBasedOnTitleQuery,

  useCreateAssignmentMutation
} = teacherSlice;
