# Building

The solution can be built by running the following command at the root of the repository:
```bash
dotnet build
```

- This will install the npm dependencies using `npm`
- Then it will build the solution (which will in turn build the control) using `dotnet`
- The resulting solution(s) will be built to `dist` in the repo root as a zip file
