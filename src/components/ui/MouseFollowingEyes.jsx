import React, { useState, useRef, useEffect } from "react";

export function MouseFollowingEyes() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const eye1Ref = useRef(null);
  const eye2Ref = useRef(null);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="eyes-container">
      <Eye
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        selfRef={eye1Ref}
        otherRef={eye2Ref}
      />
      <Eye
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        selfRef={eye2Ref}
        otherRef={eye1Ref}
      />
    </div>
  );
}

const Eye = ({ mouseX, mouseY, selfRef, otherRef }) => {
  const pupilRef = useRef(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  const updateCenter = () => {
    if (!selfRef.current) return;
    const rect = selfRef.current.getBoundingClientRect();
    setCenter({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  useEffect(() => {
    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, []);

  useEffect(() => {
    updateCenter();

    const isInside = (ref) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return false;
      return (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
      );
    };

    if (isInside(selfRef) || isInside(otherRef)) return;

    const dx = mouseX - center.x;
    const dy = mouseY - center.y;
    const angle = Math.atan2(dy, dx);

    const maxMove = 8; // fixed bounds so pupils don't break out of the eye
    const pupilX = Math.cos(angle) * maxMove;
    const pupilY = Math.sin(angle) * maxMove;

    if (pupilRef.current) {
      pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    }
  }, [mouseX, mouseY, center.x, center.y, selfRef, otherRef]);

  return (
    <div ref={selfRef} className="eye-outer">
      <div ref={pupilRef} className="eye-pupil">
        <div className="eye-glint"></div>
      </div>
    </div>
  );
};
