export const HOST_URL = (() => {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL;
  const branchUrl = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;
  const localhost = "localhost:3000";

  if (url || branchUrl) {
    return `https://${url || branchUrl}`;
  }
  return `http://${localhost}`;
})();
