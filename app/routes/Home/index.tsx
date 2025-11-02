import type { Route } from ".react-router/types/app/+types/root";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Cards = [
  {
    id: 1,
    title: "ユーザー一覧を取得",
    link: "/users",
    description: "react の Suspense の検証",
  },
  {
    id: 2,
    title: "Todo App",
    link: "/todo",
    description: "GraphQLの学習のために作成したTodoアプリ",
  },
  {
    id: 3,
    title: "Chat App",
    link: "/chat",
    description: "websocketの学習のために作成したチャットアプリ",
  },
];

export default function Home() {
  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        {Cards.map((card, index) => (
          <Card
            sx={{ minWidth: 275, maxWidth: 350 }}
            variant="outlined"
            key={index}
          >
            <CardContent>
              <Typography variant="h4" component="div">
                {card.title}
              </Typography>

              <Typography variant="body2">
                {card.description ?? "No description"}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={card.link}>
                <Button size="small">Link</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </>
  );
}
