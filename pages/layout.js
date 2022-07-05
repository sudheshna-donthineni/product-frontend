import * as React from "react";
import DashboardSidebar from "layout/DashboardSidebar";

const styles = {
  display: "flex",
  flexDirection: "row",
};

const sectionStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

export default function Layout({ children }) {
  return (
    <main style={styles}>
      <DashboardSidebar />
      <section style={sectionStyle}>{children}</section>
    </main>
  );
}
