import { apiService } from "./../../app/app.service";

export const scrapeApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    fetchScrapes: builder.query({
      query: () => ({
        url: "/scrapes",
        method: "GET",
      }),
      providesTags: ["Scrapes"],
    }),
  }),
});

export const { useFetchScrapesQuery } = scrapeApi;
