import { apiSlice } from "../apiSlice";

export const teacherSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranchesByYear: builder.query({
      query: (params) => ({
        url: "/get-branches-by-year",
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
      providesTags: () => ['Class Assignment Titles']
    }),

    createAssignment: builder.mutation({
      query: (data) => ({
        url: "/create-assignment",
        method: "POST",
        data,
      }),
      invalidatesTags: () => []
    }),

    assignMarks: builder.mutation({
      query: (data) => ({
        url: "/assign-marks",
        method: "POST",
        data,
      }),
      invalidatesTags: () => ['Class Assignment Titles']
    }),

    myAssignmentsForTeacher: builder.query({
      query: (params) => ({
        url: "/my-assignment-teacher",
        method: "GET",
        params,
      }),
    })

  }),
});

export const {
  useGetBranchesByYearQuery,
  useGetSectionsByBranchYearQuery,
  useGetAssignmentsByTeacherQuery,
  useGetSubjectByBranchYearSectionSemQuery,
  useGetClassAssignmentsBasedOnTitleQuery,
  useAssignMarksMutation,
  useCreateAssignmentMutation,
  useMyAssignmentsForTeacherQuery
} = teacherSlice;
