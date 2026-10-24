package fi.tamk.autoarvio.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import fi.tamk.autoarvio.data.repository.CatalogRepository
import fi.tamk.autoarvio.ui.generations.GenerationDetailScreen
import fi.tamk.autoarvio.ui.generations.GenerationDetailViewModel
import fi.tamk.autoarvio.ui.generations.GenerationListScreen
import fi.tamk.autoarvio.ui.generations.GenerationListViewModel
import fi.tamk.autoarvio.ui.makes.MakeListScreen
import fi.tamk.autoarvio.ui.makes.MakeListViewModel
import fi.tamk.autoarvio.ui.models.ModelListScreen
import fi.tamk.autoarvio.ui.models.ModelListViewModel
import fi.tamk.autoarvio.ui.navigation.Routes

@Composable
fun AutoArvioApp(
    catalogRepository: CatalogRepository? = null,
) {
    val context = LocalContext.current
    val catalog = catalogRepository ?: remember(context) {
        CatalogRepository(context.applicationContext)
    }
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Routes.MAKE_LIST,
    ) {
        composable(Routes.MAKE_LIST) {
            val vm: MakeListViewModel = viewModel(
                factory = MakeListViewModel.factory(catalog),
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
                    repository = catalog,
                    initialQuery = initialQuery,
                ),
            )
            ModelListScreen(
                viewModel = vm,
                onBack = { navController.popBackStack() },
                onModelClick = { model ->
                    navController.navigate(Routes.generationList(model.id))
                },
            )
        }
        composable(
            route = Routes.GENERATION_LIST,
            arguments = listOf(navArgument("modelId") { type = NavType.StringType }),
        ) { entry ->
            val modelId = entry.arguments?.getString("modelId").orEmpty()
            val vm: GenerationListViewModel = viewModel(
                factory = GenerationListViewModel.factory(modelId, catalog),
            )
            GenerationListScreen(
                viewModel = vm,
                onBack = { navController.popBackStack() },
                onGenerationClick = { generation ->
                    navController.navigate(Routes.generationDetail(generation.id))
                },
            )
        }
        composable(
            route = Routes.GENERATION_DETAIL,
            arguments = listOf(navArgument("generationId") { type = NavType.StringType }),
        ) { entry ->
            val generationId = entry.arguments?.getString("generationId").orEmpty()
            val vm: GenerationDetailViewModel = viewModel(
                factory = GenerationDetailViewModel.factory(generationId, catalog),
            )
            GenerationDetailScreen(
                viewModel = vm,
                onBack = { navController.popBackStack() },
            )
        }
    }
}
