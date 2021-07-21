# Styled-Components Auditor

wip project to help audit projects for uses of `styled.XXX` and `styled(xxx)` to help find code-duplication and refactoring opportunities.

## Usage

```
$ sc-audit [root-directory]
```

Root directory defaults to `./src`

## Example Output

```
7 files scanned
Found 4 native HTML elements restyled
Found 2 custom elements restyled
{ h1: 1, h2: 3, CustomComponent: 2 }
```

## Try it yourself

```
$ yarn example
```
