import { apiService } from "./../../app/app.service";

export const teamApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    fetchTeams: builder.query({
      query: () => ({
        url: "/teams/withClient",
        method: "GET",
      }),
      providesTags: ["Teams"],
    }),
    createTeam: builder.mutation({
      query: (data) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teams"],
    }),
    editTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Teams"],
    }),
    removeTeam: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teams"],
    }),
    createClient: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/clients/${id}`,
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Teams"],
    }),
  }),
});

export const {
  useFetchTeamsQuery,
  useCreateTeamMutation,
  useEditTeamMutation,
  useRemoveTeamMutation,
  useCreateClientMutation,
} = teamApi;
