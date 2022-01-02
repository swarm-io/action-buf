<!-- start title -->
<!-- end title -->
<!-- start description -->
<!-- end description -->
<!-- start contents -->
<!-- end contents -->
<!-- start usage -->
<!-- end usage -->
<!-- start inputs -->
<!-- end inputs -->
<!-- start outputs -->
<!-- end outputs -->
<!-- start examples -->
### Example usage on PR to run breaking, mod, and generate commands. Changes are committed back to the branch.
```yaml
name: Pull Request
on:
  pull_request:
    branches:
      - main
    paths:
      - 'exampleapis/**'
      - 'buf.gen.yaml'
      - 'buf.work.yaml'
jobs:
  buf:
    name: Run buf commands
    runs-on: ubuntu-latest
    steps:
      - uses: crazy-max/ghaction-dump-context@v1
      - uses: swarm-io/action-buf@v1
        with:
          token: ${{ secrets.GIT_RUNNER_TOKEN }}
          buf-user: ${{ secrets.BUF_USER }}
          buf-token: ${{ secrets.BUF_TOKEN }}
```
### Example usage on release to push to BSR
```yaml
name: Push protos to buf
on:
  release:
    types: [created]
jobs:
  buf-push:
    name: Push protos to buf bsr
    runs-on: ubuntu-latest
    steps:
      - uses: crazy-max/ghaction-dump-context@v1
      - uses: swarm-io/action-buf@v1
        with:
          token: ${{ secrets.GIT_RUNNER_TOKEN }}
          buf-user: ${{ secrets.BUF_USER }}
          buf-token: ${{ secrets.BUF_TOKEN }}
          lint: false
          generate: false
          breaking: false
          mod-prune: false
          mod-update: false
          push: true
```
<!-- end examples -->
<!-- start [.github/ghdocs/examples/] -->
<!-- end [.github/ghdocs/examples/] -->
