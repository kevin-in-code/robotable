# robotable

A simulation of a robot moving on a table. It is somewhat over-engineered :-).


## Getting started

You can either build the project with your installed system tools, such as NodeJS and NPM, or you can build the docker image instead.

### Using your globally installed system tools

```bash
  npm install
  npm run build
  npm start [sample.txt]
  # or omit sample.txt for interactive terminal
```

### Using Docker

```bash
  docker build -t robotable .
  docker run -it robotable [sample.txt]
  # or omit sample.txt for interactive terminal
```

## Notes on interactive use

If you wish to enter robot commands by hand, simply omit the file argument.

While in interactive mode, you may terminate the command entry at any point by typing 3 empty lines of text.

## Bugs and feedback

Please feel welcome to send me bugs and feedback.
