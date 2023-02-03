import { useState, useEffect, useCallback } from "react";
import { useToast, CreateToastFnReturn } from "@chakra-ui/react";

const handleRequest = ({
  setIsLoading,
  setData,
  setError,
  requestPromise,
  requestArgs,
  toast,
  options,
}: {
  setIsLoading: Function;
  setData: Function;
  setError: Function;
  toast: CreateToastFnReturn;
  requestPromise: (args?: any) => Promise<any>;
  requestArgs?: any;
  options?: {
    onSuccess?: (args: any) => void;
    onError?: (error: Error) => void;
    errorMessage?: string;
    successMessage?: string;
  };
}) => {
  setIsLoading(true);
  requestPromise(requestArgs)
    .then((res: Object) => {
      setData(res);
      setIsLoading(false);
      typeof options?.onSuccess === "function" && options.onSuccess(res);
      if (options?.successMessage) {
        toast({
          position: "top",
          title: options?.successMessage,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    })
    .catch((err) => {
      setError(err);
      setIsLoading(false);
      typeof options?.onError === "function" && options.onError(err);
      if (options?.errorMessage) {
        toast({
          position: "top",
          title: options?.errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    });
};

export const useQuery = (
  requestPromise: (args?: any) => Promise<any>,
  requestArgs?: any,
  options?: {
    onSuccess?: (args: any) => void;
    onError?: (error: Error) => void;
    errorMessage?: string;
    successMessage?: string;
  }
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  useEffect(() => {
    handleRequest({
      setIsLoading,
      setData,
      setError,
      requestPromise,
      requestArgs,
      toast,
      options,
    });
  }, [requestArgs]);
  return { data, error, isLoading };
};

export const useMutation = (
  requestPromise: (args?: any) => Promise<any>,
  requestArgs?: any,
  options?: {
    onSuccess?: (args: any) => void;
    onError?: (error: Error) => void;
    errorMessage?: string;
    successMessage?: string;
  }
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const mutate = useCallback(() => {
    handleRequest({
      setIsLoading,
      setData,
      setError,
      requestPromise,
      requestArgs,
      toast,
      options,
    });
  }, [requestArgs]);
  return { mutate, data, error, isLoading };
};
