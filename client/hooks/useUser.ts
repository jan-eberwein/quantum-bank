import { useEffect, useState } from "react";
import userApi from "@/api/userApi";

const useUser = () => {
    const [user, setUser] = useState<UserApi | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            try {
                const userData = await userApi.getLoggedInUser();
                setUser(userData);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};

export default useUser;
