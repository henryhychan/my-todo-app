# Troubleshooting / Development Logs

1. When signing up a new user, if the RLS is disabled, creating a new record in `public.todos_users` is ok.
However, if `**RLS is enabled**`, even the insert or update policy is enabled to public, the error **`42501 - new row violates row-level security policy for table todos_users`** thrown.
- Resolution: Temporarily disable RLS.


2. When signing up a new user, if the email confirmation is required, the createUser function will be skipped. Thus, failed to create a new record in "todos_users" table.
```
  function onSubmit({fullName, email, password}) {
    signup({fullName, email, password}, {
        onSuccess: (data) => {
            console.log("User signed up successfully:", data);
            createUser({user_id: data.user.id, email, fullName});
        },
        onSettled: () => reset(),
    });
  }
```
- Resolution: Temporarily disabled Email Confirmation on Signing Up process.
