## Demo Github Action for testing

```yml
name: GitHub Action Demo
run-name: ${{github.action}} is testing out
on: [push]

jobs:
  Explore-Github-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "1st steps"
      - run: echo "Auto Trigger on ${{github.event_name}} in ${{ github.ref }}"
      - run: echo "Running on ${{runner.os}}"

      - name: Check out repository code
        uses: actions/checkout@v3
      - run: echo "${{github.repository}}"

  New-Test:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Hello, 2nd step"
      - run: echo "Auto Trigger on ${{github.event_name}} in ${{ github.ref }}"
```

## Test Github actions

```yml
name: GitHub Action Test
on: [push]

jobs:
  Github-Actions-Test:
    runs-on: ubuntu-latest
    steps:
      - run: echo "steps Test"

      - name: Check out repository code
        uses: actions/checkout@v3
      - run: echo "${{github.repository}}"
```

## Start Github actions with CI

```yml
name: Github Actions CI

on:
  push:
    branches:
      - main

  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: [ubuntu-latest]

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '14'
      - run: npm install
```
