export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'sayHelloTo' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
