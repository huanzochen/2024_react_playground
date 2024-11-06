import { useState, useRef, useEffect } from "react";
import styles from "./TabSwiper.module.scss";

const TABS = [
  { id: 0, name: "全部優惠", description: "全部優惠的列表" },
  { id: 1, name: "買一送一", description: "This is a BOGO campaign" },
  { id: 2, name: "點數回饋", description: "This is a point  back offer" },
];

// Not working
const TabSwiper = () => {
  const tabWrapperRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const animationID = useRef(0);

  useEffect(() => {
    const tabWrapper = tabWrapperRef.current;

    if (!tabWrapper) return;

    const startDrag = (event) => {
      setIsDragging(true);
      setStartPos(getPositionX(event));
      setPrevTranslate(currentTranslate);
      animationID.current = requestAnimationFrame(animation);
    };

    const endDrag = () => {
      setIsDragging(false);
      cancelAnimationFrame(animationID.current);
      const movedBy = currentTranslate - prevTranslate;

      if (movedBy < -100) {
        setCurrentTranslate(prevTranslate - 100);
      } else if (movedBy > 100) {
        setCurrentTranslate(prevTranslate + 100);
      } else {
        setCurrentTranslate(prevTranslate);
      }

      setPositionByIndex();
    };

    const drag = (event) => {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        setCurrentTranslate(prevTranslate + currentPosition - startPos);
      }
    };

    const getPositionX = (event) => {
      return event.type.includes("mouse")
        ? event.pageX
        : event.touches[0].clientX;
    };

    const animation = () => {
      setSliderPosition();
      if (isDragging) requestAnimationFrame(animation);
    };

    const setSliderPosition = () => {
      tabWrapper.style.transform = `translateX(${currentTranslate}px)`;
    };

    const setPositionByIndex = () => {
      tabWrapper.style.transition = "transform 0.3s ease-out";
      setSliderPosition();
      tabWrapper.addEventListener("transitionend", () => {
        tabWrapper.style.transition = "none";
      });
    };

    tabWrapper.addEventListener("mousedown", startDrag);
    tabWrapper.addEventListener("mouseup", endDrag);
    tabWrapper.addEventListener("mouseleave", endDrag);
    tabWrapper.addEventListener("mousemove", drag);

    tabWrapper.addEventListener("touchstart", startDrag);
    tabWrapper.addEventListener("touchend", endDrag);
    tabWrapper.addEventListener("touchmove", drag);

    return () => {
      tabWrapper.removeEventListener("mousedown", startDrag);
      tabWrapper.removeEventListener("mouseup", endDrag);
      tabWrapper.removeEventListener("mouseleave", endDrag);
      tabWrapper.removeEventListener("mousemove", drag);

      tabWrapper.removeEventListener("touchstart", startDrag);
      tabWrapper.removeEventListener("touchend", endDrag);
      tabWrapper.removeEventListener("touchmove", drag);
    };
  }, [isDragging, startPos, currentTranslate, prevTranslate]);

  return (
    <>
      <h2> Tabs swipe like swiper </h2>
      <div className={styles.tabContainer}>
        <div className={styles.tabWrapper}>
          {TABS.map((data, index) => (
            <div key={index} className={styles.tabSlide}>
              {data.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TabSwiper;
