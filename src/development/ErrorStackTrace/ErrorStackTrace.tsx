import React, {
  Component,
  PropsWithChildren,
  useEffect,
} from 'react';

type TparseStackTraceLine = {
  at: string;
  link: string;
  file: string;
};

function parseStackTraceLine(line: string): TparseStackTraceLine | null {
  const pattern = /^at (.+) \((.+):(\d+):(\d+)\)$/;
  const match = pattern.exec(line.trim());

  if (match) {
    const [, at, link, lineNo, column] = match;
    const file = `${link.substring(link.lastIndexOf('/') + 1)}:${lineNo}:${column}`;

    return {
      at,
      file,
      link,
    };
  }
  return null;
}

function ErrorFormatter({ error }: { error: Error }) {
  const stackTrace =
    error.stack && error.stack.split('\n').flatMap((el) => {
      const line = parseStackTraceLine(el);
      return line ? [line] : [];
    });

  useEffect(() => {
    window.document.body.style.backgroundColor = 'black';
  }, []);

  return (
    <div
      style={{
        border: '2px solid white',
        borderRadius: '5px',
        padding: '10px',
        margin: '20px',
        backgroundColor: 'black',
      }}
    >
      <h1
        style={{
          color: 'whitesmoke',
          padding: '10px',
          fontFamily: 'Courier New',
        }}
      >
        {error.name} : {error.message}
      </h1>
      <div style={{ padding: '10px' }}>
        {stackTrace ? (
          stackTrace.map((el, i) => (
            <div key={i} style={{ paddingBottom: '5px' }}>
              <p style={{ color: 'whitesmoke' }}>
                - {el.at}{' '}
                <a style={{ color: 'whitesmoke' }} href={el.link}>
                  {el.file}
                </a>
              </p>
            </div>
          ))
        ) : (
          <div style={{ color: 'whitesmoke' }}>loading stack trace...</div>
        )}
      </div>
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
