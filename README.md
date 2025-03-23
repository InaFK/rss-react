# rss-react

RS School. React course

## Performance Profiling

### Initial Profiling (Before Full Optimization)
The app was profiled using React Dev Tools Profiler to measure performance during a sort operation (changing "Sort by" from "Name" to "Population" and "Direction" from "Ascending" to "Descending"). This was done before applying `React.memo`, with only `useMemo` for the country list.

- **Commit Duration**: [e.g., 12.5ms] - Total time for React to commit updates after sorting.
- **Render Duration**: 
  - `App`: [e.g., 2.1ms]
  - `CountryList`: [e.g., 8.3ms] - Longest due to rendering 250+ countries.
  - `SortControls`: [e.g., 1.2ms]
  - `RegionFilter` and `SearchBar`: [e.g., 0.5ms each] - Re-rendered unnecessarily.
- **Interactions**: Two renders triggered (one for `sortBy`, one for `sortDirection`).
- **Flame Graph**: Shows `CountryList` dominating render time, with unnecessary re-renders of `RegionFilter` and `SearchBar`.
- **Ranked Chart**: `CountryList` at the top, followed by `App` and `SortControls`.

#### Screenshots
- Flame Graph: ![Before Flame Graph](....)
- Ranked Chart: ![Before Ranked Chart](....)
