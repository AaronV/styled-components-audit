# Styled-Components Auditor

wip project to help audit projects for uses of `styled.XXX` and `styled(xxx)` to help find code-duplication and refactoring opportunities.

## Usage

```
$ ./node_modules/@vanaaron/styled-components-auditor/build/scan.js [root-directory]
```

Root directory defaults to `./src`

## Example Output

```
2 files scanned
Native elements restyled: 6
Custom elements restyled: 2
Details:
  div: 3
  Button: 2
  h1: 1
  h2: 1
  button: 1
```

## Try it yourself

Just clone the repo and run:

```
$ yarn example
```
