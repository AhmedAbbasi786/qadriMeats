import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "@core/components/forms/Form";
import Message from "@core/components/ui/Message";
import Loader from "@core/components/ui/Loader";
import { loginUser } from "store/auth";
import FormInput from "@core/components/forms/FormInput";
import { Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import withAuth from "hooks/withAuth";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  mBottom: {
    marginBottom: ".5rem",
  },
  button: {
    marginTop: ".85rem",
  },
  loginCard: {
    width: "275px",
    borderRadius: 5,
    background: "#fff",
    padding: ".85rem",
  },
  fullScreen: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { message, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className={classes.fullScreen}>
      <div className={classes.loginCard}>
        <Typography variant="h5" component="h1">
          Login
        </Typography>
        <Typography className={classes.mBottom} variant="body1">
          Sign In to your account
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {message && <Message severity="error">{message}</Message>}
          <FormInput
            {...register("username")}
            id="username"
            type="text"
            label="User Name"
            name="username"
            error={!!errors.username}
            helperText={errors?.username?.message}
          />
          <FormInput
            {...register("password")}
            id="password"
            type="password"
            label="Password"
            name="password"
            error={!!errors.password}
            helperText={errors?.password?.message}
          />

          <div className={classes.mBottom}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              className={classes.button}
            >
              {loading ? <Loader /> : "Login"}
            </Button>
          </div>
        </Form>
        <Typography variant="caption">&copy; QadriMeat | Admin</Typography>
      </div>
    </div>
  );
};

export default withAuth(LoginPage, false);
