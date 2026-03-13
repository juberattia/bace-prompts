"use client";

import { useEffect, useRef, useCallback } from "react";

interface Viewer3DProps {
  file: File;
  onResetCamera?: () => void;
}

export default function Viewer3D({ file }: Viewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viewerRef = useRef<any>(null);
  const loadedFileRef = useRef<string>("");

  const initViewer = useCallback(async () => {
    if (!containerRef.current) return;

    const OV = await import("online-3d-viewer");

    // Destroy previous viewer if exists
    if (viewerRef.current) {
      try {
        viewerRef.current.Destroy();
      } catch {
        // ignore cleanup errors
      }
      viewerRef.current = null;
    }

    // Clear container
    containerRef.current.innerHTML = "";

    const viewer = new OV.EmbeddedViewer(containerRef.current, {
      backgroundColor: new OV.RGBAColor(247, 247, 247, 255),
      defaultColor: new OV.RGBColor(180, 180, 180),
      edgeSettings: new OV.EdgeSettings(
        true,
        new OV.RGBColor(120, 120, 120),
        30
      ),
      onModelLoaded: () => {
        // Fit model to view after loading
        const v = viewer.GetViewer();
        if (v) {
          const boundingSphere = v.GetBoundingSphere(() => true);
          if (boundingSphere) {
            v.FitSphereToWindow(boundingSphere, true);
          }
        }
      },
    });

    viewerRef.current = viewer;
  }, []);

  // Initialize viewer and load file
  useEffect(() => {
    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
    if (loadedFileRef.current === fileKey && viewerRef.current) return;
    loadedFileRef.current = fileKey;

    initViewer().then(() => {
      if (viewerRef.current) {
        viewerRef.current.LoadModelFromFileList([file]);
      }
    });

    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.Destroy();
        } catch {
          // ignore cleanup errors
        }
        viewerRef.current = null;
        loadedFileRef.current = "";
      }
    };
  }, [file, initViewer]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (viewerRef.current) {
        viewerRef.current.Resize();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-studio-bg rounded-md overflow-hidden"
      style={{ minHeight: "400px" }}
    />
  );
}
