import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Next's static file server resolves content types via `send`'s
        // bundled mime table, which has no .usdz entry — it falls back to
        // application/octet-stream and Safari's AR Quick Look silently
        // no-ops on that. Force the type Apple's docs require.
        source: "/models/:path*.usdz",
        headers: [
          {
            key: "Content-Type",
            value: "model/vnd.usdz+zip",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
