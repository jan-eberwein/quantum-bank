import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";



// Hardcoded tokens for now
// Account id=1 (Alice)
const DEMO_BEARER_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczNDI5NTIwNywiZXhwIjox"
    + "NzM0Mjk4ODA3fQ.uM6vl5SCSY9P4ExPjQz9GowPhNgSwfIozM3K6ShvynE";
// Account id=2 (Bob)
//const DEMO_BEARER_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTczNDI5NTM5MywiZXhwIjox"
//    + "NzM0Mjk4OTkzfQ.MveIZbsl0xQ1KQ-dlNEMAU-exXjJt18lV228H38bxx0";
// Account id=3 (Charlie)
//const DEMO_BEARER_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTczNDI5NTQyNywiZXhwIjox"
//    + "NzM0Mjk5MDI3fQ.qpMUeRkUQpb6Zg6UpiZ6P2Zxc_amIgG19BVDTw-r9hU";
// Account id=4 (testuser)
//const DEMO_BEARER_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTczNDI5NTQ1NiwiZXhwIjox"
//    + "NzM0Mjk5MDU2fQ.ygdGzVPPvA_VRnRAzcjWD53M7PXlZ8TmZrMqrRTNnfo";
// Account id=7 (newuser2)
//const DEMO_BEARER_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTczNDI5NTUwOCwiZXhwIjox"
//    + "NzM0Mjk5MTA4fQ.UF9G0i0_DT_AkwZiELJc5wMyomVZOdDM-ZtFErcRFp4";

// API service for user
const userApi = {
    getLoggedInUser: async (): Promise<UserApi> => {
        try {
            const response = await axios.get<UserApi>(`${API_BASE_URL}/users/me`, {
                headers: {
                    Authorization: DEMO_BEARER_TOKEN,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error;
        }
    },
};

export default userApi;
