// vite.config.ts
import { defineConfig } from "file:///Users/metincansiper/Documents/Workspace/react-bounded-overlay-manager/node_modules/vite/dist/node/index.js";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "file:///Users/metincansiper/Documents/Workspace/react-bounded-overlay-manager/node_modules/glob/dist/esm/index.js";
import react from "file:///Users/metincansiper/Documents/Workspace/react-bounded-overlay-manager/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///Users/metincansiper/Documents/Workspace/react-bounded-overlay-manager/node_modules/vite-plugin-dts/dist/index.mjs";
import { libInjectCss } from "file:///Users/metincansiper/Documents/Workspace/react-bounded-overlay-manager/node_modules/vite-plugin-lib-inject-css/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/metincansiper/Documents/Workspace/react-bounded-overlay-manager";
var __vite_injected_original_import_meta_url = "file:///Users/metincansiper/Documents/Workspace/react-bounded-overlay-manager/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ["lib"] })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib/main.ts"),
      formats: ["es"]
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      input: Object.fromEntries(
        glob.sync("lib/**/*.{ts,tsx}").map((file) => [
          relative(
            "lib",
            file.slice(0, file.length - extname(file).length)
          ),
          fileURLToPath(new URL(file, __vite_injected_original_import_meta_url))
        ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWV0aW5jYW5zaXBlci9Eb2N1bWVudHMvV29ya3NwYWNlL3JlYWN0LWJvdW5kZWQtb3ZlcmxheS1tYW5hZ2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWV0aW5jYW5zaXBlci9Eb2N1bWVudHMvV29ya3NwYWNlL3JlYWN0LWJvdW5kZWQtb3ZlcmxheS1tYW5hZ2VyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tZXRpbmNhbnNpcGVyL0RvY3VtZW50cy9Xb3Jrc3BhY2UvcmVhY3QtYm91bmRlZC1vdmVybGF5LW1hbmFnZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgZXh0bmFtZSwgcmVsYXRpdmUsIHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHsgZ2xvYiB9IGZyb20gJ2dsb2InXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcbmltcG9ydCB7IGxpYkluamVjdENzcyB9IGZyb20gJ3ZpdGUtcGx1Z2luLWxpYi1pbmplY3QtY3NzJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgbGliSW5qZWN0Q3NzKCksXG4gICAgZHRzKHsgaW5jbHVkZTogWydsaWInXSB9KVxuICBdLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnbGliL21haW4udHMnKSxcbiAgICAgIGZvcm1hdHM6IFsnZXMnXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ3JlYWN0JywgJ3JlYWN0L2pzeC1ydW50aW1lJ10sXG4gICAgICBpbnB1dDogT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgICBnbG9iLnN5bmMoJ2xpYi8qKi8qLnt0cyx0c3h9JykubWFwKGZpbGUgPT4gW1xuICAgICAgICAgIHJlbGF0aXZlKFxuICAgICAgICAgICAgJ2xpYicsIFxuICAgICAgICAgICAgZmlsZS5zbGljZSgwLCBmaWxlLmxlbmd0aCAtIGV4dG5hbWUoZmlsZSkubGVuZ3RoKVxuICAgICAgICAgICksXG4gICAgICAgICAgZmlsZVVSTFRvUGF0aChuZXcgVVJMKGZpbGUsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXVtleHRuYW1lXScsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLmpzJyxcbiAgICAgIH0sICBcbiAgICB9LFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvWSxTQUFTLG9CQUFvQjtBQUNqYSxTQUFTLFNBQVMsVUFBVSxlQUFlO0FBQzNDLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsWUFBWTtBQUNyQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsb0JBQW9CO0FBTjdCLElBQU0sbUNBQW1DO0FBQTJNLElBQU0sMkNBQTJDO0FBU3JTLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7QUFBQSxFQUMxQjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUN2QyxTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsU0FBUyxtQkFBbUI7QUFBQSxNQUN2QyxPQUFPLE9BQU87QUFBQSxRQUNaLEtBQUssS0FBSyxtQkFBbUIsRUFBRSxJQUFJLFVBQVE7QUFBQSxVQUN6QztBQUFBLFlBQ0U7QUFBQSxZQUNBLEtBQUssTUFBTSxHQUFHLEtBQUssU0FBUyxRQUFRLElBQUksRUFBRSxNQUFNO0FBQUEsVUFDbEQ7QUFBQSxVQUNBLGNBQWMsSUFBSSxJQUFJLE1BQU0sd0NBQWUsQ0FBQztBQUFBLFFBQzlDLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
