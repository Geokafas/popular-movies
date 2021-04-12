import { shallowMount } from "@vue/test-utils";
import movies_list from "@/components/listView/MoviesList.vue";
import movie_details from "@/components/detailsView/MovieDetails.vue";
import error_card from "@/components/errorHandling/ErrorCard.vue";

describe("MovieDetais.vue", () => {
  it("selectedMovieObject", () => {
    const selectedId = 0;

    //it cannot by loading=false and slectedID=0 by programming logic
    //if selectedId is 0 and loading is false then the api has either
    //returned somthing or crashed. Either way it is handled by errorBoundry
    const loading = true;
    const movieDetailsList = [];
    const wrapper = shallowMount(movie_details, {
      propsData: { movieDetailsList, selectedId, loading },
    });
    expect(wrapper.vm.selectedMovieObject).toEqual([]);

    wrapper.setProps({ loading: false });
    expect(wrapper.vm.selectedMovieObject).toEqual([]);
  });
  it("selectedMovieObject", () => {
    const selectedId = 399566;
    const obj = {
      movie_id: 399566,
      movie_language: "en",
      movie_original_title: "Godzilla vs. Kong",
      movie_overview:
        "In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.",
      movie_posterpath: "/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg",
      movie_releash_date: "2021-03-24",
      movie_translated_title: "Godzilla vs. Kong",
      movie_vote_average: 8.4,
    };
    const loading = false;
    const movieDetailsList = [obj];
    const wrapper = shallowMount(movie_details, {
      propsData: { movieDetailsList, selectedId, loading },
    });

    expect(wrapper.vm.selectedId).toBe(399566);
    expect(wrapper.vm.selectedMovieObject).toBe(obj);
  });
});

describe("MoviesList.vue", () => {
  it("increments the page counter that shows the fetched movie titles", () => {
    const titlesList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const wrapper = shallowMount(movies_list, {
      propsData: { titlesList },
    });
    expect(wrapper.vm.modifier).toBe(0);
    wrapper.findComponent({ ref: "nextbtn" }).trigger("click");
    expect(wrapper.vm.modifier).toBe(10);
    wrapper.setData({ modifier: 10 });
    expect(wrapper.vm.disableNextPage).toBe(true);
  });
  it("disableNextPage: controls the disable property of the nextbtn", () => {
    const titlesList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const wrapper = shallowMount(movies_list, {
      propsData: { titlesList },
    });
    wrapper.setData({ modifier: 10 });
    expect(wrapper.vm.disableNextPage).toBe(true);
    wrapper.setData({ modifier: 0 });
    expect(wrapper.vm.disableNextPage).toBe(false);
    wrapper.setData({ modifier: -1 });
    expect(wrapper.vm.disableNextPage).toBe(false);
  });
  it("disablePrevPage: controls the disable property of the prevbtn", () => {
    const titlesList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const wrapper = shallowMount(movies_list, {
      propsData: { titlesList },
    });
    wrapper.setData({ modifier: 0 });
    expect(wrapper.vm.disablePrevPage).toBe(true);
    wrapper.setData({ modifier: 10 });
    expect(wrapper.vm.disablePrevPage).toBe(false);
    wrapper.setData({ modifier: -1 });
    expect(wrapper.vm.disablePrevPage).toBe(true);
    wrapper.setData({ modifier: 1000 });
    expect(wrapper.vm.disablePrevPage).toBe(false);
  });
  //in order to work i must change the :disabled property of the prevbtn to true
  // it("decrements the page counter that shows the fetched movie titles", async () => {
  //   const titlesList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  //   const wrapper = shallowMount(movies_list, {
  //     propsData: { titlesList },
  //   });
  //   wrapper.setData({ modifier: 10 });
  //   wrapper.findComponent({ ref: "prevbtn" }).trigger("click");
  //   expect(wrapper.vm.modifier).toBe(0);
  // });

  it("slicedMovieList: returns a sliced list, of the initial MovieList, based on the modifier variable ", async () => {
    const titlesList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const wrapper = shallowMount(movies_list, {
      propsData: { titlesList },
    });
    wrapper.setData({ modifier: 10 });
    expect(wrapper.vm.slicedMovieList).toEqual([11, 12]);
    wrapper.setData({ modifier: 0 });
    expect(wrapper.vm.slicedMovieList).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
