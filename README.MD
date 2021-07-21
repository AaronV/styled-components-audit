# Styled-Components Auditor

wip project to help audit projects for uses of `styled.XXX` and `styled(xxx)` to help find code-duplication and refactoring opportunities.

## Usage

```
$ sc-audit [root-directory]
```

Root directory defaults to `./src`

## Example Output

```
2 files scanned
Native elements restyled: 3
Custom elements restyled: 2
Details...
{ h1: 1, h2: 1, button: 1, Button: 2 }

```

## Try it yourself

```
$ yarn example
```
