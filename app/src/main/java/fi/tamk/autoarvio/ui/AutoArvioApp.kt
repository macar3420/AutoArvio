package fi.tamk.autoarvio.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import fi.tamk.autoarvio.data.repository.CatalogRepository
import fi.tamk.autoarvio.ui.makes.MakeListScreen
import fi.tamk.autoarvio.ui.makes.MakeListViewModel
import fi.tamk.autoarvio.ui.models.ModelListScreen
import fi.tamk.autoarvio.ui.models.ModelListViewModel
import fi.tamk.autoarvio.ui.navigation.Routes

@Composable
fun AutoArvioApp(
    catalogRepository: CatalogRepository = remember { CatalogRepository() },
) {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Routes.MAKE_LIST,
    ) {
        composable(Routes.MAKE_LIST) {
            val vm: MakeListViewModel = viewModel(
                factory = MakeListViewModel.factory(catalogRepository),
            )
            MakeListScreen(
                viewModel = vm,
                onMakeClick = { make ->
                    navController.navigate(Routes.modelList(make.id))
                },
                onModelClick = { make, modelName ->
                    navController.navigate(Routes.modelList(make.id, modelName))
                },
            )
        }
        composable(
            route = Routes.MODEL_LIST,
            arguments = listOf(
                navArgument("makeId") { type = NavType.StringType },
                navArgument("q") {
                    type = NavType.StringType
                    defaultValue = ""
                },
            ),
        ) { entry ->
            val makeId = entry.arguments?.getString("makeId").orEmpty()
            val initialQuery = entry.arguments?.getString("q").orEmpty()
            val vm: ModelListViewModel = viewModel(
                factory = ModelListViewModel.factory(
                    makeId = makeId,
                    repository = catalogRepository,
                    initialQuery = initialQuery,
                ),
            )
            ModelListScreen(
                viewModel = vm,
                onBack = { navController.popBackStack() },
            )
        }
    }
}
