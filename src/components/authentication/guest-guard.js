import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/use-auth";
import PropTypes from "prop-types";

export const GuestGuard = (props) => {
  const { children } = props;
  const auth = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }
      if (auth.isAuthenticated) {
        router.push("/home");
      } else {
        setChecked(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]
  );
  if (!checked) {
    return null;
  }
  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};
