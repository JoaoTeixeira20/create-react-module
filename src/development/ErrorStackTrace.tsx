import React, {
  Component,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { mapStackTrace } from 'sourcemapped-stacktrace';

type TparseStackTraceLine = {
  at: string;
  link: string;
  file: string;
};

function parseStackTraceLine(stack: string): TparseStackTraceLine {
  const regex = /at (\S+) \((.+?):(\d+):(\d+)\)/;
  const match = regex.exec(stack);

  if (!match) {
    return {
      at: '',
      file: '',
      link: '',
    };
  }

  const [, at, link, line, column] = match;
  const file = link.substring(link.lastIndexOf('/') + 1);

  return { at, link, file: `${file}:${line}:${column}` };
}

function ErrorFormatter({ error }: { error: Error }) {
  const [stackTrace, setStackTrace] = useState<TparseStackTraceLine[]>();

  useEffect(() => {
    mapStackTrace(error.stack, function (mappedStack) {
      setStackTrace(
        mappedStack.map((el) => {
          return parseStackTraceLine(el);
        })
      );
    });
  }, []);

  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      <h1 style={{ color: 'red' }}>
        {error.name} : {error.message}
      </h1>
      {stackTrace ? (
        stackTrace.map((el, i) => (
          <div key={i}>
            <p style={{ color: 'red' }}>
              {el.at}{' '}
              <a style={{ color: '#ad2929' }} href={el.link}>
                {el.file}
              </a>
            </p>
          </div>
        ))
      ) : (
        <div>loading stack trace...</div>
      )}
    </div>
  );
}

type ErrorBoundaryProps = PropsWithChildren;

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <>
          {this.state.error ? (
            <ErrorFormatter error={this.state.error} />
          ) : (
            <div>no error to show</div>
          )}
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
