# Next.js Modal Pages Demo

```
$ yarn
$ yarn start
```

## How Does It Work?

- Page updates in Next.js route transitions are performed by unmounting the
  previous page component and mounting the next one.
- In `_app.js`, you have the ability to render additional content besides just
  the current page component (in fact you could skip rendering the page
  component entirely if you wanted).
- So, this demo renders a component in `_app.js` that keeps track of the
  previously rendered page components. When the latest page is rendered and
  given a `modal` query param, the page is pushed onto a stack instead of
  completely replacing the previous one.
