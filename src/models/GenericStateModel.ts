export default interface GenericState<T> {
  data: T;
  status: string;
  error: string;
}
